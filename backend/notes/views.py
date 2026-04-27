from django.shortcuts import render
from rest_framework import viewsets
from .models import NotePaper
from .serializers import NotePaperSerializer


# Create your views here.
class NotePaperViewSet(viewsets.ModelViewSet):
    queryset = NotePaper.objects.all().order_by("-updated_at")
    serializer_class = NotePaperSerializer
