from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CitationViewSet, ViolationViewSet

# Use DRF's DefaultRouter for automatic URL generation
router = DefaultRouter()
router.register(r'citations', CitationViewSet, basename='citation')
router.register(r'violations', ViolationViewSet, basename='violation')

urlpatterns = [
    path('', include(router.urls)),  # This includes the API routes
]
