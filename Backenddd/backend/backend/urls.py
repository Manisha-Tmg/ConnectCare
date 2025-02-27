from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from project.views import UserViewSet, UserRegistrationView,LoginView,get_caretakers,book_caretaker,get_user


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
    path('auth/api/login/', LoginView.as_view(), name='user_login'),


    # Caretaker list and id
    path('api/caretakers/', get_caretakers, name='get_caretakers'),
    path('api/caretakers/<int:caretaker_id>', get_caretakers, name='get_caretakers'),


    #User list and id
    path('api/users/',get_user,name='ger_caretaker'),
    path('api/users/<int:user_id>',get_user,name='ger_caretaker'),


    # Booking
    path('api/book_caretaker/', book_caretaker, name='book_caretaker'),

    ]

# Add router-generated URLs
urlpatterns += router.urls
