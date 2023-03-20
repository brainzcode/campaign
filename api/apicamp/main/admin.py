from django.contrib import admin
from .models import Campaign, Subscriber


class CampaignAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}


admin.site.register(Campaign, CampaignAdmin)
admin.site.register(Subscriber)
