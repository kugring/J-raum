from uuid import uuid4

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CafeMenu, CafeOption, OrderList, ClientNumberData, CafeManager, PointList
import os
from JraumKiosk.settings import MEDIA_ROOT
from django.http import JsonResponse
from django.shortcuts import get_object_or_404  # 데이터를 조회하다가 값이 없는 경우 오류를 반환합니다
from django.shortcuts import render
from django.utils import timezone
from datetime import date
from django.core.serializers import serialize
import threading
import time
from django.db.models import F
from django.http import HttpResponse
from openpyxl import Workbook
import pytz # 엑셀파일을 출력중에 날짜 데이터는 해석할 수 없으므로 필요한 라이브러리


class Ezen(APIView):
    def get(self, request):

        return render(request, 'main/test3.html')

class Main(APIView):
    def get(self, request):
        cafemenus = CafeMenu.objects.all()
        cafeoption = CafeOption.objects.all()
        order_list = OrderList.objects.all()
        manager_list = CafeManager.objects.all()

        categorys = ['커피', '논커피', '차', '음료수']
        option_tags = ['샷추가', '얼음', '온도', '아이스크림', '설탕시럽', '바닐라시럽', '카라멜시럽']

        today = timezone.now().date()

        context = {
            'cafemenus': cafemenus,
            'cafeoption': cafeoption,
            'categorys': categorys,
            'today': today,
            'option_tags': option_tags,
            'order_list': order_list,
            'manager_list': manager_list
        }
        return render(request, 'main/main.html', context)

class OrderListView(APIView):
    def get(self, request):
        # 오늘 날짜 가져오기
        today = date.today()

        waiting_count = OrderList.objects.filter(order_status='대기').count()
        order_person = OrderList.objects.filter(modified_at__date=today).count() + 1

        context = {
            'waiting_count': waiting_count,
            'order_person': order_person,
        }
        return JsonResponse({'context': context})

    def post(self, request):
        order_name = request.data.get('order_name')
        phone_number = request.data.get('phone_number')
        total_quantity = request.data.get('total_quantity')
        total_price = request.data.get('total_price')
        order_status = request.data.get('order_status')
        order_menu = request.data.get('order_menu')

        OrderList.objects.create(order_name=order_name, total_quantity=total_quantity, total_price=total_price,
                                 order_status=order_status, order_menu=order_menu, phone_number=phone_number)

        return Response(status=200)


def get_result_list(queryset, field_name):
    return [str(entry[field_name]) for entry in queryset.values(field_name)]


def search_phone_number(request):
    # 해당 번호를 가진 유저들을 가져온다

    if request.method == 'GET':
        phone_number = request.GET.get('phone_number', '')

        # 모델 필터링
        result_data = ClientNumberData.objects.filter(phone_number=phone_number)

        # QuerySet을 리스트로 변환하고 각 딕셔너리를 문자열로 변환
        result_list = get_result_list(result_data, 'name')

        result_value = ', '.join(result_list) if result_list else 'null'

        return JsonResponse({'result': result_value})

    return JsonResponse({'error': 'Invalid request method'})


def search_manager_number(request):
    # 해당 번호를 가진 유저들을 가져온다

    if request.method == 'GET':
        manager_number = request.GET.get('manager_number', '')

        # 모델 필터링
        result_data = CafeManager.objects.filter(password=manager_number)

        # QuerySet을 리스트로 변환하고 각 딕셔너리를 문자열로 변환
        result_list = get_result_list(result_data, 'name')

        result_value = ', '.join(result_list) if result_list else 'null'
        print(result_value)
        return JsonResponse({'result': result_value})

    return JsonResponse({'error': 'Invalid request method'})


def select_name(request):
    # 해당 이름을 가진 사람의 포인트값을 가져온다.

    if request.method == 'GET':
        user_name = request.GET.get('user_name', '')

        # 모델 필터링
        result_data = ClientNumberData.objects.filter(name=user_name)

        # QuerySet을 리스트로 변환하고 각 딕셔너리를 문자열로 변환
        result_list = get_result_list(result_data, 'current_point')

        result_value = ', '.join(result_list) if result_list else 'null'

        return JsonResponse({'result': result_value})

    return JsonResponse({'error': 'Invalid request method'})


class FinalPayment(APIView):
    def post(self, request):
        if request.method == 'POST':
            # POST 요청에서 이름과 전화번호를 가져옴
            name = request.data.get('name')
            phone_number = request.data.get('phoneNumber')
            new_point = request.data.get('newPoint')  # 새로운 포인트 값
            print(name, phone_number, new_point)

            try:
                # 이름과 전화번호로 필터링된 첫 번째 데이터를 가져옴
                client_data = ClientNumberData.objects.filter(name=name, phone_number=phone_number).first()

                if client_data:
                    # 필터링된 데이터가 존재하는 경우
                    client_data.current_point = new_point
                    client_data.save()

                    return JsonResponse({'success': '포인트가 성공적으로 수정되었습니다.'})
                else:
                    # 필터링된 데이터가 없는 경우
                    return JsonResponse({'error': '해당하는 데이터가 없습니다.'}, status=404)
            except Exception as e:
                # 예외 발생 시 처리
                return JsonResponse({'error': str(e)}, status=500)

        return JsonResponse({'error': 'Invalid request method'}, status=405)


#######################################################################################################
# 아래는 주문 내역 관련 views  #
#######################################################################################################


class OrderData(APIView):
    def get(self, request):
        today = timezone.now().date()

        order_list = OrderList.objects.filter(modified_at__date=today)

        context = {
            'today': today,
            'order_list': order_list,
        }
        return render(request, 'main/order_data.html', context)


class OrderDetail(APIView):
    def post(self, request):
        # POST 요청에서 이름과 전화번호를 가져옴
        global order_list_data
        date_str = request.data.get('selected_date')
        name_str = request.data.get('selected_name')
        status_str = request.data.get('selected_status')
        print(str(status_str))

        try:
            # status가 있는 경우
            if status_str:
                print(status_str)
                # status가 있고 날짜가 있는 경우
                if date_str:
                    select_date = timezone.datetime.strptime(date_str, '%Y-%m-%d').date()
                    order_data = OrderList.objects.filter(order_status=status_str,
                                                          modified_at__date=select_date).values()
                    order_list_data = []
                    for order in order_data:
                        order_list_data.append(order)

                    # status가 있고 날짜도 있고 이름도 있는 경우
                    if name_str:
                        order_data = OrderList.objects.filter(order_status=status_str, order_name=name_str,
                                                              modified_at__date=select_date).values()
                        order_list_data = []
                        for order in order_data:
                            order_list_data.append(order)
                        print('잘되고 있낭?', name_str)

                # status가 있고 날짜는 없고 이름만 있는 경우
                else:
                    order_data = OrderList.objects.filter(order_status=status_str).values()
                    order_list_data = []
                    for order in order_data:
                        order_list_data.append(order)

                    if name_str:
                        order_data = OrderList.objects.filter(order_status=status_str, order_name=name_str).values()

                        order_list_data = []
                        for order in order_data:
                            order_list_data.append(order)
                        print('잘되고 있낭?', name_str)

                # OrderList 객체를 직렬화하여 JSON으로 변환
                context = {'order_data': order_list_data}
                return JsonResponse(context)
            # status가 없는 경우
            else:
                # status가 없고 날짜가 있는 경우
                if date_str:
                    select_date = timezone.datetime.strptime(date_str, '%Y-%m-%d').date()
                    order_data = OrderList.objects.filter(modified_at__date=select_date).values()
                    order_list_data = []
                    for order in order_data:
                        order_list_data.append(order)

                    # status가 없고 날짜도 있고 이름도 있는 경우
                    if name_str:
                        order_data = OrderList.objects.filter(order_name=name_str,
                                                              modified_at__date=select_date).values()
                        order_list_data = []
                        for order in order_data:
                            order_list_data.append(order)
                        print('잘되고 있낭?', name_str)
                # status가 없고 날짜는 없고 이름만 있는 경우
                else:
                    order_data = OrderList.objects.all().values()
                    order_list_data = []
                    for order in order_data:
                        order_list_data.append(order)
                        print(456)
                    if name_str:
                        order_data = OrderList.objects.filter(order_name=name_str).values()
                        order_list_data = []
                        for order in order_data:
                            order_list_data.append(order)
                        print('잘되고 있낭?', name_str)

                # OrderList 객체를 직렬화하여 JSON으로 변환
                context = {'order_data': order_list_data}
                return JsonResponse(context)

        except ValueError as ve:
            # 날짜 형식이 올바르지 않은 경우 처리
            return JsonResponse({'error': 'Invalid date format. Use YYYY-MM-DD.'}, status=400)
        except Exception as e:
            # 예외 발생 시 처리
            return JsonResponse({'error': str(e)}, status=500)


class OrderDelete(APIView):
    def post(self, request):
        id_str = request.data.get('selected_id')
        name = request.data.get('name')
        phone_number = request.data.get('phone_number')
        price = request.data.get('price')  # 수정: request.data로 데이터 가져오기
        print(id_str, name, phone_number, price)
        if phone_number and price:
            try:
                print(phone_number, price, '트라이 시도함')
                # 해당 전화번호와 이름을 가진 고객을 찾습니다.
                refund_order = ClientNumberData.objects.filter(phone_number=phone_number, name=name).first()
                print(refund_order, '목표를 찾아서 오류를 내지 않음')
                # 현재 포인트를 환불된 가격만큼 증가시킵니다.
                refund_order.current_point += price
                refund_order.save()  # 수정: .update() 대신에 각 객체마다 save() 호출
                print(phone_number, price, '마지막으로 세이프 진행함')

            except Exception as e:
                return JsonResponse({'error': str(e)}, status=500)

        try:
            # 해당 id에 해당하는 주문을 찾아 삭제합니다.
            order = OrderList.objects.get(id=id_str)
            order.delete()
            return JsonResponse({'message': 'Data deleted successfully.'})
        except OrderList.DoesNotExist:
            return JsonResponse({'error': 'Data with the given id does not exist.'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


#######################################################################################################
# 아래는 주문 내역 관련 views  #
#######################################################################################################


class Manager(APIView):
    def get(self, request):
        today = timezone.now().date()

        order_list = OrderList.objects.filter(order_status='대기').first()
        order_list_value = OrderList.objects.filter(order_status='대기').values()
        waiting_count = OrderList.objects.filter(order_status='대기').count()

        context = {
            'today': today,
            'order_list': order_list,
            'order_list_value': order_list_value,
            'waiting_count': waiting_count
        }
        return render(request, 'main/manager.html', context)


class ManagerOrderData(APIView):
    def get(self, request):
        order_list_values = list(OrderList.objects.filter(order_status='대기').values())
        waiting_count = OrderList.objects.filter(order_status='대기').count()

        context = {
            'order_list_values': order_list_values,
            'waiting_count': waiting_count
        }

        return Response(context)

    def post(self, request):
        charge_status = request.data.get('charge_status')
        client_name = request.data.get('client_name')
        push_point = request.data.get('push_point')
        current_point = request.data.get('current_point')
        password = request.data.get('password')

        PointList.objects.create(charge_status=charge_status, client_name=client_name,
                                 password=password, push_point=push_point, current_point=current_point)

        return Response(status=200)


class ManagerCheck(APIView):
    def post(self, request):
        print('데이터가 들어가긴함?')
        client_name = request.data.get('client_name')
        push_point = request.data.get('push_point')
        current_point = request.data.get('current_point')
        password = request.data.get('point_password')
        point_id = request.data.get('point_id')
        manager_name = request.data.get('manager_name')
        print(client_name, push_point, current_point, password, point_id, manager_name)
        # 매니저 값이 있는 경우
        if manager_name:
            manager_check = PointList.objects.filter(id=point_id).first()
            print(manager_check, '매니저 확인')
            # 클라이언트 데이터 조회
            client_data = ClientNumberData.objects.filter(name=client_name, phone_number=password).first()
            print(client_data, '클라이언트 조회')
            # 현재 데이터에서 원하는 값만큼 더하여 업데이트
            if client_data:
                # 현재 데이터의 'current_point' 필드에 추가값을 더한 후 저장
                client_data.current_point = F('current_point') + push_point
                client_data.save()

            print(manager_check)
            manager_check.manager = manager_name
            manager_check.charge_status = '승인'
            manager_check.save()

            return JsonResponse({'success': '포인트가 성공적으로 수정되었습니다.'})
        else:
            charge_status = PointList.objects.filter(client_name=client_name, push_point=push_point,
                                                     current_point=current_point).values_list('charge_status',
                                                                                              flat=True).last()
            if charge_status == '승인':
                context = {
                    'charge_status': charge_status,
                }
                return JsonResponse(context)
            else:
                # '승인'이 아닌 경우에 대한 처리
                return JsonResponse({'error': '승인되지 않았습니다.'}, status=400)


class ManagerDelete(APIView):
    def post(self, request):
        client_name = request.data.get('client_name')
        push_point = request.data.get('push_point')
        current_point = request.data.get('current_point')
        charge_status = request.data.get('charge_status')
        password = request.data.get('password')
        point_id = request.data.get('point_id')

        print('123')

        if point_id:
            point_delete = PointList.objects.filter(id=point_id).first()
            point_delete.delete()
            print('아이디로 삭제된거 맞냐고~~?')

        try:
            # 모델에서 해당 아이디에 해당하는 데이터를 가져옵니다.
            point_charge_cancel = PointList.objects.filter(charge_status=charge_status, client_name=client_name,
                                                           push_point=push_point, current_point=current_point)
            # 데이터를 삭제합니다.
            point_charge_cancel.delete()
            return JsonResponse({'message': 'Data deleted successfully.'})
        except PointList.DoesNotExist:
            return JsonResponse({'error': 'Data with the given id does not exist.'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


class ManagerMenuList(APIView):
    def post(self, request):
        selected_id_str = request.data.get('selected_id')  # 선택된 메뉴 아이디
        order_id_str = request.data.get('order_id')  # 주문 아이디
        completed_id_str = request.data.get('completed_id')  # 완료된 메뉴 아이디
        if completed_id_str:
            try:
                completed_order = OrderList.objects.get(id=completed_id_str)
                completed_order.order_status = '완료'
                completed_order.save()
            except CafeMenu.DoesNotExist:
                return JsonResponse({'error': 'Completed menu with the given id does not exist.'}, status=404)

        try:
            menu_list = CafeMenu.objects.filter(id=selected_id_str).values()
            order_list = OrderList.objects.filter(id=order_id_str).values()

            context = {
                'menu_list': list(menu_list),
                'order_list': list(order_list)
            }
            return JsonResponse(context)
        except (CafeMenu.DoesNotExist, OrderList.DoesNotExist) as e:
            return JsonResponse({'error': str(e)}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


def ManagerTest(request):
    # 데이터베이스에서 최신 데이터를 가져옵니다.
    point_request = PointList.objects.filter(charge_status='미승인').order_by('-created_at')
    print(point_request, '아무일도 없다')
    # 가져온 데이터를 템플릿에 렌더링합니다.
    return render(request, 'main/point_request.html', {'point_request': point_request})


#######################################################################################################
# 아래는 포인트 충전 관련 views  #
#######################################################################################################


class PointExamine(APIView):
    def get(self, request):
        today = timezone.now().date()

        point_list = PointList.objects.all()
        point_request = PointList.objects.filter(charge_status='미승인')

        context = {
            'today': today,
            'point_list': point_list,
            'point_request': point_request
        }
        return render(request, 'main/point.html', context)


#######################################################################################################
# 아래는 클라이언트 명단 관련 views  #
#######################################################################################################


class ClientList(APIView):
    def get(self, request):
        today = timezone.now().date()

        client_data = ClientNumberData.objects.all().order_by('name')
        manager_list = CafeManager.objects.all()

        context = {
            'today': today,
            'manager_list': manager_list,
            'client_data': client_data,
        }
        return render(request, 'main/client_list.html', context)


class ClientAppend(APIView):
    def post(self, request):
        name = request.data.get('name')
        position = request.data.get('position')
        point = request.data.get('point')
        phone_number = request.data.get('phone_number')

        ClientNumberData.objects.create(name=name, position=position, current_point=point,
                                        phone_number=phone_number)

        return Response(status=200)


class ClientUpdate(APIView):
    def post(self, request):
        client_id = request.data.get('client_id')
        position = request.data.get('position')
        client_name = request.data.get('client_name')
        phone_number = request.data.get('phone_number')
        print(client_id, position, client_name, phone_number)

        update_client = ClientNumberData.objects.get(id=client_id)
        if position == '' and client_name == '' and phone_number == '':
            update_client.delete()
        else:
            update_client.position = position
            update_client.name = client_name
            update_client.phone_number = phone_number
            update_client.save()

        print(update_client)
        return Response(status=200)


#######################################################################################################
# 아래는 메뉴 명단 관련 views  #
#######################################################################################################

class MenuList(APIView):
    def get(self, request):
        today = timezone.now().date()

        menu_list = CafeMenu.objects.all().order_by('id')
        cafeoption = CafeOption.objects.all()

        context = {
            'today': today,
            'menu_list': menu_list,
            'cafeoption': cafeoption,
        }
        return render(request, 'main/menu_list.html', context)


class MenuAppend(APIView):
    def post(self, request):
        category = request.data.get('category')
        name = request.data.get('name')
        price = request.data.get('price')
        shot = request.data.get('shot')
        deg = request.data.get('deg')
        options = request.data.get('options')
        img = request.data.get('img')
        if deg == 1:
            print('숫자 차가움')
        if deg == '1':
            print('문자 차가움')
        CafeMenu.objects.create(category=category, name=name, price=price,
                                shot=shot, deg=deg, options=options, img=img)

        return Response(status=200)


class MenuUpdate(APIView):
    def post(self, request):
        menu_id = request.data.get('menu_id')
        category = request.data.get('category')
        name = request.data.get('name')
        price = request.data.get('price')
        shot = request.data.get('shot')
        deg = request.data.get('deg')
        options = request.data.get('options')
        img = request.data.get('img')

        update_menu = CafeMenu.objects.get(id=menu_id)

        if category == '' and name == '' and price == '' and shot == '' and deg == '' and options == '':

            update_menu.delete()

        else:
            update_menu.name = name
            update_menu.category = category
            update_menu.price = price
            update_menu.shot = shot
            update_menu.deg = deg
            update_menu.options = options
            update_menu.img = img
            update_menu.save()

        print(update_menu)
        return Response(status=200)


#######################################################################################################
# 아래는 db의 값을 엑셀로 출력하는 views  #
#######################################################################################################

def download_excel(request):
    # 데이터베이스에서 데이터를 가져옴
    queryset = OrderList.objects.all()

    # 엑셀 파일 생성
    workbook = Workbook()
    worksheet = workbook.active
    worksheet.append(['주문자', '주문 메뉴', '총 수량', '총 결제', '회원 번호', '주문일자', '주문상태'])  # 열 헤더 작성

    # 데이터베이스에서 가져온 데이터를 엑셀 파일에 작성
    for obj in queryset:
        # 객체의 시간대를 UTC로 변환
        modified_at_utc = obj.modified_at.astimezone(pytz.utc).replace(tzinfo=None)
        worksheet.append(
            [obj.order_name, obj.order_menu, obj.total_quantity, obj.total_price, obj.phone_number, modified_at_utc,
             obj.order_status])  # 각 레코드의 데이터 작성

    # 엑셀 파일을 HTTP 응답으로 전송
    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename="data.xlsx"'
    workbook.save(response)

    return response
