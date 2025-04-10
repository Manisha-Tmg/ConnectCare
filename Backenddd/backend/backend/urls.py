from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from project.views import UserViewSet, UserRegistrationView,LoginView,AdminLoginView,CaretakerLoginView,NotificationViewSet,ChangePasswordView,get_caretakers,book_caretaker,get_user,get_Booking,booking_action,get_CaretakerBooking,booking_count_api,CaretakerRegistrationView,admin_dashboard,change_caretaker_status,change_user_status,CareChangePasswordView,delete_user,caretaker_delete
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
    path('api/changepassword/', ChangePasswordView.as_view(), name='changepassword'),
    path('caretakers/<int:id>/change-status/', change_caretaker_status, name='change-caretaker-status'),
    path('users/<int:id>/change-status/', change_user_status, name='change-users-status'),


    # Caretaker list and id
    path('api/login/caretaker', CaretakerLoginView.as_view(), name='caretaker_login'),
    path('caretaker/bookings/<int:booking_id>/action/', booking_action, name='booking_action'),
    path('caretaker/dashboard/', booking_count_api, name='booking_count'),
    path('api/caretakers/', get_caretakers, name='get_caretakers'),
    path('caretaker/changepassword/', CareChangePasswordView.as_view(), name='change--password'),

    path('api/caretakers/<int:caretaker_id>', get_caretakers, name='get_caretakers'),
    # path('api/caretakers/notification/', 
    #     NotificationCaretakerViewSet.as_view({'get': 'list'}), name='caretaker-notification-list'),



    #User list and id
    path('api/users/',get_user,name='ger_user'),
    path('api/users/<int:user_id>',get_user,name='ger_user'),    
    




    # Booking
    path('api/book_caretaker/', book_caretaker, name='book_caretaker'),


    # Booking list and id
    path('api/bookings/', get_Booking, name='book_caretakerlist'),
    path('api/caretaker/bookings/', get_CaretakerBooking, name='listofbook_caretaker'),
    path('api/users/notification/', 
        NotificationViewSet.as_view({'get': 'list'}), name='notification-list'),
   



    # Admin
    path('auth/api/login/admin', AdminLoginView.as_view(), name='Admin_login'),
    path('caretakers/register/', CaretakerRegistrationView.as_view(), name='caretaker-register'),
    path('api/admin/dashboard/', admin_dashboard, name='admin-dashboard'),
    path('api/admin/user/delete/<int:user_id>/', delete_user, name='user-delete'),
    path('api/admin/caretaker/delete/<int:caretaker_id>/', caretaker_delete, name='user-delete'),

    # note:Dont forgot the slash at end this cause error page not faound/


    ]

# Add router-generated URLs
urlpatterns += router.urls

