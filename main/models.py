from django.db import models
from django.utils import timezone


class CafeMenu(models.Model):
    category = models.CharField(max_length=255)
    deg = models.CharField(max_length=255)
    en = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=0)
    img = models.CharField(max_length=255)
    options = models.CharField(max_length=255, default='')
    shot = models.DecimalField(max_digits=10, decimal_places=0, null=True)
    deg_num = models.DecimalField(max_digits=10, decimal_places=0, null=True)

    def formatted_price(self):
        return '{:,.0f}원'.format(int(self.price))

    # 객체를 출력할 때 __str__ 메서드 호출
    # def __str__(self):
    #     return self.name


class CafeOption(models.Model):
    option = models.TextField()
    option_en = models.TextField(null=True, blank=True)
    option_item = models.TextField()
    option_price = models.TextField()
    option_def = models.TextField(default='')


class OrderList(models.Model):
    ORDER_STATUS_CHOICES = [
        ('pending', '대기'),
        ('processing', '진행중'),
        ('completed', '완료됨'),
    ]

    order_menu = models.CharField(max_length=255)
    total_price = models.DecimalField(max_digits=10, decimal_places=0, default=0, null=True)
    total_quantity = models.DecimalField(max_digits=10, decimal_places=0, default=0, null=True)
    order_name = models.CharField(max_length=255)
    modified_at = models.DateTimeField(auto_now=True)  # 현재 시간으로 기본값 설정
    order_status = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES, default='pending')


class ClientNumberData(models.Model):
    name = models.CharField(max_length=15, null=False)
    phone_number = models.CharField(max_length=15, null=False)
    current_point = models.CharField(max_length=15, null=True, blank=True)
    charge_point = models.CharField(max_length=15, null=True, blank=True)
    position = models.CharField(max_length=15, null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)
    value = models.CharField(max_length=15, null=True, default='default_value')


class CafeManager(models.Model):
    position = models.CharField(max_length=15, null=True, blank=True)
    name = models.CharField(max_length=15)
    password = models.CharField(max_length=15, null=False)


class PointList(models.Model):
    manager = models.CharField(max_length=15)
    client_data = models.CharField(max_length=15)
    push_point = models.CharField(max_length=15)
    current_point = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    @classmethod
    def create_from_client_data(cls, client_data):
        return cls(
            client_name=client_data.name,
            current_point=client_data.current_point,
        )
