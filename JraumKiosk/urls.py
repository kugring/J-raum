from django.contrib import admin
from django.urls import path, include
from main.views import Main
from django.conf.urls.static import static

from .settings import MEDIA_URL, MEDIA_ROOT

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', Main.as_view()),
]

urlpatterns += static(MEDIA_URL, document_root=MEDIA_ROOT)
