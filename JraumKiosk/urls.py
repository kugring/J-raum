from django.contrib import admin
from django.urls import path, include
from main.views import Main, OrderListView, search_phone_number, search_manager_number, select_name, FinalPayment
from main.views import OrderData, OrderDetail, OrderDelete, Manager, ManagerOrderData, ManagerMenuList, ManagerCheck
from main.views import PointExamine, ManagerDelete, ManagerTest, ClientList, ClientAppend, ClientUpdate
from main.views import MenuList, MenuAppend, MenuUpdate, download_excel
from django.conf.urls.static import static
from main.views import Home, gift, Photo, HBD

from .settings import MEDIA_URL, MEDIA_ROOT

urlpatterns = [
    path('GiBeom/Home', Home.as_view()),
    path('GiBeom/gift', gift.as_view()),
    path('GiBeom/Photo', Photo.as_view()),
    path('GiBeom/HBD', HBD.as_view()),
    path('admin/', admin.site.urls),
    path('', Main.as_view()),
    path('orderList/', OrderListView.as_view()),
    path('api/Phone_number_search/', search_phone_number, name='search_phone_number'),
    path('api/Manger_number_search/', search_manager_number, name='search_manager_number'),
    path('api/select/', select_name, name='select_name'),
    path('final_payment/', FinalPayment.as_view()),
    path('OrderData/', OrderData.as_view()),
    path('OrderDetail/', OrderDetail.as_view()),
    path('OrderDelete/', OrderDelete.as_view()),
    path('manager/', Manager.as_view()),
    path('ManagerOrderData/', ManagerOrderData.as_view()),
    path('ManagerMenuList/', ManagerMenuList.as_view()),
    path('ManagerCheck/', ManagerCheck.as_view()),
    path('ManagerDelete/', ManagerDelete.as_view()),
    path('ManagerTest/', ManagerTest, name='ManagerTest'),
    path('PointExamine/', PointExamine.as_view()),
    path('Client_list/', ClientList.as_view()),
    path('ClientAppend/', ClientAppend.as_view()),
    path('ClientUpdate/', ClientUpdate.as_view()),
    path('Menu_list/', MenuList.as_view()),
    path('MenuAppend/', MenuAppend.as_view()),
    path('MenuUpdate/', MenuUpdate.as_view()),
    path('download-excel/', download_excel, name='download-excel'),
]

urlpatterns += static(MEDIA_URL, document_root=MEDIA_ROOT)
