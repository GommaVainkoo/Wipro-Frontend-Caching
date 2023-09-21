from django.urls import path
from .import views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns=[
    path('',views.getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('hobbies',views.getHobbies),
    path('register',views.signup,name='register'),
    path('table',views.Baracade1View.as_view(),name='table_data'),
    path('index',views.IndexDBView.as_view(),name="indexdb"),
]