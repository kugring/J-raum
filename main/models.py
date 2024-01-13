from django.db import models


class CafeMenu(models.Model):
    category = models.CharField(max_length=255)
    deg = models.CharField(max_length=255)
    en = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=0)
    img = models.CharField(max_length=255)
    options = models.CharField(max_length=255, default='')

    def formatted_price(self):
        return '{:,.0f}원'.format(int(self.price))

    # 객체를 출력할 때 __str__ 메서드 호출
    # def __str__(self):
    #     return self.name


class CafeOption(models.Model):
    option = models.CharField(max_length=255)
    option_item = models.CharField(max_length=255)
    option_price = models.CharField(max_length=255, default='')
