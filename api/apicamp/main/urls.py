from django.urls import path
from .views import CampaignListAPIView, CampaignDetailAPIView, SubscribeToCampaignAPIView

urlpatterns = [
    path('campaign/', CampaignListAPIView.as_view(), name='campaign'),
    path('campaign/<str:slug>/', CampaignDetailAPIView.as_view(),
         name='campaign_details'),
    path('subscriber/',
         SubscribeToCampaignAPIView.as_view(), name='subscriber'),
]
