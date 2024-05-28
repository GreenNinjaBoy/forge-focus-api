from django.urls import path
from assignment import views

urlpatterns = [
    path('assignment/', views.AssignmentList.as_view()),
    path('assignment/<int:pk>', views.AssignmentDetail.as_view),
]