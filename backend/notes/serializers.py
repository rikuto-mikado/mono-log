from rest_framework import serializers
from .models import NotePaper


class NotePaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotePaper
        fields = "__all__"
