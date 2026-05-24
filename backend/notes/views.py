from rest_framework import viewsets
from .models import NotePaper
from .serializers import NotePaperSerializer
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone


# Create your views here.
class NotePaperViewSet(viewsets.ModelViewSet):
    queryset = NotePaper.objects.all().order_by("-updated_at")
    serializer_class = NotePaperSerializer

    def get_queryset(self):
        return NotePaper.objects.filter(is_deleted=False).order_by("-updated_at")

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_deleted = True
        instance.deleted_at = timezone.now()
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=["get"])
    def trashList(self, request, pk=None):
        queryset = NotePaper.objects.filter(is_deleted=True).order_by("-deleted_at")
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def restoreNoteFromTrash(self, request, pk=None):
        instance = NotePaper.objects.get(pk=pk)
        instance.is_deleted = False
        instance.deleted_at = None
        instance.save()
        return Response(self.get_serializer(instance).data)

    @action(detail=True, methods=["delete"])
    def deleteNotePermanently(self, request, pk=None):
        instance = NotePaper.objects.get(pk=pk)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
