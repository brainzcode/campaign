from django.urls import path
from .views import CampaignListAPIView, CampaignDetailAPIView

urlpatterns = [
    path('campaign/', CampaignListAPIView.as_view(), name='campaign'),
    path('campaign/<str:slug>/', CampaignDetailAPIView.as_view(), name='details'),
]
