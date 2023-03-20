from django.db import models
from cloudinary.models import CloudinaryField


class Campaign(models.Model):
    title = models.CharField(max_length=200, unique=True)
    description = models.TextField(blank=True)
    slug = models.SlugField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    logo = CloudinaryField('Image', overwrite=True, format='jpg')

    class Meta:
        ordering = ('-created_at',)

    def __str__(self) -> str:
        return self.title


class Subscriber(models.Model):
    campaign = models.ForeignKey(to=Campaign, on_delete=models.DO_NOTHING)
    email = models.EmailField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self) -> str:
        return self.email
