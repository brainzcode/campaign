from django.contrib import admin
from .models import Campaign


class CampaignAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}


admin.site.register(Campaign, CampaignAdmin)
