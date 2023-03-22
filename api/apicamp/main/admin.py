from django.contrib import admin
from .models import Campaign, Subscriber


class CampaignAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}
    list_display = ('title', 'created_at', 'updated_at')
    search_fields = ('title', 'description', 'slug')
    list_per_page = 20


class SubscriberAdmin(admin.ModelAdmin):
    list_display = ('campaign', 'email', 'created_at', 'updated_at')
    search_fields = ('campaign__title', 'email')
    list_per_page = 20


admin.site.register(Campaign, CampaignAdmin)
admin.site.register(Subscriber, SubscriberAdmin)
