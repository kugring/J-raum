from uuid import uuid4

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CafeMenu, CafeOption, OrderList
import os
from JraumKiosk.settings import MEDIA_ROOT
from django.http import JsonResponse
from datetime import datetime
from django.shortcuts import get_object_or_404  # 데이터를 조회하다가 값이 없는 경우 오류를 반환합니다
from django.shortcuts import render
from django.utils import timezone


class Main(APIView):
    def get(self, request):
        cafemenus = CafeMenu.objects.all()
        cafeoption = CafeOption.objects.all()
        orders = OrderList.objects.all()
        categorys = ['커피', '논커피', '차', '음료수']
        option_tags = ['샷추가', '얼음', '온도', '아이스크림', '설탕시럽', '바닐라시럽', '카라멜시럽']

        today = timezone.now().date()

        context = {
            'cafemenus': cafemenus,
            'cafeoption': cafeoption,
            'categorys': categorys,
            'today': today,
            'option_tags': option_tags,
            'orders': orders
        }
        return render(request, 'main/main.html', context)


class OrderListView(APIView):
    def post(self, request):
        order_name = request.data.get('order_name')
        order_price = request.data.get('order_price')
        order_quantity = request.data.get('order_quantity')

        OrderList.objects.create(order_name=order_name, order_price=order_price, order_quantity=order_quantity)

        print(order_name)

        return Response(status=200)
