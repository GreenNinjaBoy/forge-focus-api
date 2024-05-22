from django.urls import path
from goals import views

urlpatterns = [
    path('goals/', views.UserGoalList.as_view()),
    path('goals/<int:pk>', views.UserGoalDetails.as_view()),
]