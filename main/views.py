from uuid import uuid4

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CafeMenu
import os
from JraumKiosk.settings import MEDIA_ROOT
from django.http import JsonResponse
from datetime import datetime
from django.shortcuts import get_object_or_404  # 데이터를 조회하다가 값이 없는 경우 오류를 반환합니다


class Main(APIView):
    def get(self, request):
        feed_list = CafeMenu.objects.all().order_by('-id')
        return render(request, 'main/main.html', context=dict(feeds=feed_list))

    def get(self, request):
        category = ['커피','논커피','차','음료수']
        return render(request, 'main/main.html', dict(categorys=category))