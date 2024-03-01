from django.contrib import admin
from django.urls import path, include
from main.views import Main, OrderListView, search_phone_number, search_manager_number, select_name, FinalPayment
from main.views import OrderData, OrderDetail, OrderDelete, Manager, ManagerOrderData, ManagerMenuList, PointExamine
from django.conf.urls.static import static

from .settings import MEDIA_URL, MEDIA_ROOT

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', Main.as_view()),
    path('orderList/', OrderListView.as_view()),
    path('api/Phone_number_search/', search_phone_number, name='search_phone_number'),
    path('api/Manger_number_search/', search_manager_number, name='search_manager_number'),
    path('api/select/', select_name, name='select_name'),
    path('final_payment/',  FinalPayment.as_view()),
    path('OrderData/',OrderData.as_view()),
    path('OrderDetail/', OrderDetail.as_view()),
    path('OrderDelete/', OrderDelete.as_view()),
    path('manager/', Manager.as_view()),
    path('ManagerOrderData/', ManagerOrderData.as_view()),
    path('ManagerMenuList/', ManagerMenuList.as_view()),
    path('PointExamine/', PointExamine.as_view()),
]

urlpatterns += static(MEDIA_URL, document_root=MEDIA_ROOT)
