from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NotePaperViewSet

router = DefaultRouter()
router.register(r"notepapers", NotePaperViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
