from django.db import models


# Create your models here.
class NotePaper(models.Model):
    title = models.CharField(max_length=200, blank=True)
    category = models.CharField(max_length=50, blank=True, default="General")
    content = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    links = models.ManyToManyField(
        "self", symmetrical=False, related_name="backlinks", blank=True
    )
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.title or "Untitled Note"

    class Meta:
        ordering = ["-updated_at"]
