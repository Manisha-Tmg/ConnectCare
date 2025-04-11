from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from project.views import UserViewSet, UserRegistrationView,LoginView,AdminLoginView,CaretakerLoginView,NotificationViewSet,ChangePasswordView,get_caretakers,book_caretaker,get_user,get_Booking,booking_action,get_CaretakerBooking,booking_count_api,CaretakerRegistrationView,admin_dashboard,change_caretaker_status,change_user_status,delete_user,caretaker_delete,get_all_bookings
# from project.Views.Admin.total_booking_views import  

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
   
    # notification
    path('api/users/notification/', 
        NotificationViewSet.as_view({'get': 'list'}), name='notification-list'),
    
    #User list 
    path('api/users/',get_user,name='ger_user'),
    path('api/users/<int:user_id>',get_user,name='ger_user'),    
    


   
    

    # Caretaker list and api
    path('api/login/caretaker', CaretakerLoginView.as_view(), name='caretaker_login'),
    path('caretaker/bookings/<int:booking_id>/action/', booking_action, name='booking_action'),
    path('caretaker/dashboard/<int:caretaker_id>', booking_count_api, name='booking_count'),
    path('api/caretakers/', get_caretakers, name='get_caretakers'),
    path('api/caretakers/<int:caretaker_id>', get_caretakers, name='get_caretakers'),
    

  


    # Booking
    path('api/book_caretaker/', book_caretaker, name='book_caretaker'),



    # Booking list and id
    path('api/bookings/', get_Booking, name='book_caretakerlist'),
    path('api/caretaker/bookings/', get_CaretakerBooking, name='listofbook_caretaker'),
   



    # Admin
    path('auth/api/login/admin', AdminLoginView.as_view(), name='Admin_login'),
    path('caretakers/register/', CaretakerRegistrationView.as_view(), name='caretaker-register'),
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

