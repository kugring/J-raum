# Generated by Django 5.0.1 on 2024-02-05 11:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0021_cafemenu_shot'),
    ]

    operations = [
        migrations.AddField(
            model_name='cafemenu',
            name='deg_num',
            field=models.DecimalField(decimal_places=0, max_digits=10, null=True),
        ),
    ]
