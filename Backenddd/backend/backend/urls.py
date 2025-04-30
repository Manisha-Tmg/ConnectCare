from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from project.views import UserViewSet, UserRegistrationView,LoginView,ChangePasswordView,get_caretakers,book_caretaker,get_user,get_Booking,ReviewView,RequestPasswordResetView, ResetNewPassword,EditProfile
from project.caretaker_views import  CareRegistrationView,CareLoginView,booking_action,get_CaretakerBooking,booking_count_api,CaretakerChangePasswordView,ProfileEdit,RequestResetPasswordView,NewPasswordReset
from project.admin_views import  AdminLoginView,admin_dashboard,change_caretaker_status,change_user_status,delete_user,caretaker_delete,get_all_bookings
 
# Initialize the router
router = DefaultRouter()
router.register('user', UserViewSet, basename='user')

urlpatterns = [
    path('admin/', admin.site.urls),
 

    # auth   
    path('api-auth/', include('rest_framework.urls')),
    path('api/register/', UserRegistrationView.as_view(), name='user_register'), 
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),


    # user api
    path('auth/api/login/', LoginView.as_view(), name='user_login'),
    path('api/changepassword/', ChangePasswordView.as_view(), name='changepassword'),
   
    #User list 
    path('api/users/',get_user,name='ger_user'),
    path('api/users/<int:user_id>',get_user,name='ger_user'),    
    


#    review
    path('caretakers/<int:caretaker_id>/reviews/', ReviewView.as_view(), name='create-review'),
    

    # Caretaker list and api
    path('api/login/caretaker',CareLoginView.as_view(), name='caretaker_login'),
    path('caretaker/bookings/<int:booking_id>/action/', booking_action, name='booking_action'),
    path('caretaker/dashboard/<int:caretaker_id>', booking_count_api, name='booking_count'),
    path('api/caretakers/', get_caretakers, name='get_caretakers'),
    path('api/caretakers/<int:caretaker_id>', get_caretakers, name='get_caretakers'),
    path('caretakers/register/', CareRegistrationView.as_view(), name='caretaker-register'),
    path('caretakers/changepassword/<int:caretaker_id>/', CaretakerChangePasswordView.as_view(), name='caretaker-change-password'),


  
    # Booking
    path('api/book_caretaker/', book_caretaker, name='book_caretaker'),


    # users restpassword
    path('password-reset/', RequestPasswordResetView.as_view(), name='password_reset'),
    path('reset-password/', ResetNewPassword.as_view(), name='reset-password'),


    # Caretaker restpassword
    path('caretaker/password-reset/', RequestResetPasswordView.as_view(), name='password_reset'),
    path('caretaker/reset-password/', NewPasswordReset.as_view(), name='reset-password'),




    # Booking list and id
    path('api/bookings/', get_Booking, name='book_caretakerlist'),
    path('api/caretaker/bookings/', get_CaretakerBooking, name='listofbook_caretaker'),
   

    # edit details Caretaker
    path('profile-edit/<int:caretaker_id>', ProfileEdit.as_view(), name='edit-profile'),


    # edit details User
    path('edit-profile/<int:user_id>', EditProfile.as_view(), name='edit-profile'),



    # Admin
    path('auth/api/login/admin', AdminLoginView.as_view(), name='Admin_login'),
    path('api/admin/dashboard/', admin_dashboard, name='admin-dashboard'),
    path('caretakers/<int:id>/change-status/', change_caretaker_status, name='change-caretaker-status'),
    path('users/<int:id>/change-status/', change_user_status, name='change-users-status'),
    path('api/admin/caretaker/delete/<int:caretaker_id>/', caretaker_delete, name='user-delete'),
    path('api/admin/user/delete/<int:user_id>/', delete_user, name='user-delete'),
    path('api/admin/bookings/',  get_all_bookings, name='booking_list'),



    # note:Dont forgot the slash at end this cause error page not faound/


    ]

# Add router-generated URLs
urlpatterns += router.urls

