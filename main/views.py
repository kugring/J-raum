from uuid import uuid4

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CafeMenu, CafeOption, OrderList, ClientNumberData, CafeManager
import os
from JraumKiosk.settings import MEDIA_ROOT
from django.http import JsonResponse
from django.shortcuts import get_object_or_404  # 데이터를 조회하다가 값이 없는 경우 오류를 반환합니다
from django.shortcuts import render
from django.utils import timezone
from datetime import date
from django.core.serializers import serialize


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
        total_quantity = request.data.get('total_quantity')
        total_price = request.data.get('total_price')
        order_status = request.data.get('order_status')
        order_menu = request.data.get('order_menu')

        OrderList.objects.create(order_name=order_name, total_quantity=total_quantity, total_price=total_price,
                                 order_status=order_status, order_menu=order_menu)

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
        id_str = request.data.get('selected_id')  # 선택된 아이디를 받아옵니다.
        print(id_str)
        try:
            # 모델에서 해당 아이디에 해당하는 데이터를 가져옵니다.
            order = OrderList.objects.get(id=id_str)
            # 데이터를 삭제합니다.
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
        return Response(order_list_values)


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


#######################################################################################################
# 아래는 포인트 충전 관련 views  #
#######################################################################################################


class PointExamine(APIView):
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
        return render(request, 'main/point.html', context)
