# custom_filters.py

from django import template

register = template.Library()


@register.filter
def split_string(value):
    return value.split(',')

