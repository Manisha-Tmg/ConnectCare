from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from project.views import UserViewSet, UserRegistrationView,LoginView,get_caretakers


# Initialize the router
router = DefaultRouter()
router.register('user', UserViewSet, basename='user')

urlpatterns = [
    path('admin/', admin.site.urls),

    # Auth
    path('api-auth/', include('rest_framework.urls')),
    path('api/register/', UserRegistrationView.as_view(), name='user_register'), 
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/login/', LoginView.as_view(), name='user_login'),


    # Caretaker
    path('api/caretakers/', get_caretakers, name='get_caretakers'),

    ]

# Add router-generated URLs
urlpatterns += router.urls
