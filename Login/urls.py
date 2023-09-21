
from django.contrib import admin
from django.conf import settings
from django.urls import path,include
from user import views
from ms_identity_web.django.msal_views_and_urls import MsalViews

msal_urls = MsalViews(settings.MS_IDENTITY_WEB).url_patterns()



urlpatterns = [
    path("admin/", admin.site.urls),
    path("users/",include('django.contrib.auth.urls')),
    path("users/",include('user.urls')),
    path('',views.MyClass.SignupPage,name='signup'),
    path('login/',views.MyClass.SigninPage,name='login'),
    path('home/',views.MyClass.HomePage,name='index'),
    path('logout/',views.MyClass.logout_user,name='home'),
    path(f'{settings.AAD_CONFIG.django.auth_endpoints.prefix}/', include(msal_urls)),
    path('api/',include('user.api.urls'))

]
