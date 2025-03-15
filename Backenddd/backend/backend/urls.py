from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from project.views import UserViewSet, UserRegistrationView,LoginView,AdminLoginView,CaretakerLoginView,ChangePasswordView,get_caretakers,book_caretaker,get_user,get_Booking,booking_action

# Initialize the router
router = DefaultRouter()
router.register('user', UserViewSet, basename='user')
# router.register('caretakers', CaretakerViewSet)
# router.register('users', CustomUserViewSet)
# router.register('bookings', BookingViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
 

    # Auth 
    path('api-auth/', include('rest_framework.urls')),
    path('api/register/', UserRegistrationView.as_view(), name='user_register'), 
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/api/login/', LoginView.as_view(), name='user_login'),
    path('api/changepassword/', ChangePasswordView.as_view(), name='changepassword'),


    # Caretaker list and id
    path('auth/api/login/caretaker', CaretakerLoginView.as_view(), name='caretaker_login'),
    path('caretaker/bookings/<int:booking_id>/action/', booking_action, name='booking_action'),

    path('api/caretakers/', get_caretakers, name='get_caretakers'),
    path('api/caretakers/<int:caretaker_id>', get_caretakers, name='get_caretakers'),


    #User list and id
    path('api/users/',get_user,name='ger_caretaker'),
    path('api/users/<int:user_id>',get_user,name='get_caretaker'),


    # Booking
    path('api/book_caretaker/', book_caretaker, name='book_caretaker'),


    # Booking list and id
    path('api/bookings/', get_Booking, name='book_caretaker'),
    path('api/bookings/<int:booking_id>', get_Booking, name='get_book_caretaker'),



    # Admin
    path('auth/api/login/admin', AdminLoginView.as_view(), name='Admin_login'),


    ]

# Add router-generated URLs
urlpatterns += router.urls
