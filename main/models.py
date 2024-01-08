from django.db import models


class CafeMenu(models.Model):
    category = models.CharField(max_length=255)
    deg = models.CharField(max_length=255)
    en = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    img = models.CharField(max_length=255)

    # 객체를 출력할 때 __str__ 메서드 호출
    def __str__(self):
        return self.name
