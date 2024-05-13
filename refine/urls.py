from django.urls import path
from refine import views

urlpatterns = [
    path('refine/', views.RefineList.as_view()),
    path('refine/<int:pk>', views.RefineList.as_view()),
]