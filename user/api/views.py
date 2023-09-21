from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework import permissions, status


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import HobbieSerializer
from user.models import Hobbies


from user.models import Baracade1
from .serializers import Baracade1Serializer
from rest_framework import generics


from user.models import Indexdb1
from .serializers import IndexDBSerializer



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username']=user.username
        token['Email_ID']=user.email

        return token
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes=[
        'api/token',
        'api/token/refresh'
    ]

    return Response(routes)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getHobbies(request):
    user=request.user
    hobby=user.hobbies_set.all()
    serializer=HobbieSerializer(hobby,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        confirm_password = request.data.get('confirm_password')  # New field
        email = request.data.get('email')


        if username and password and password == confirm_password:  # Check if passwords match
            if User.objects.filter(username=username).exists():
                return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

            user = User.objects.create_user(username=username, password=password, email=email
                                            )

            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Invalid registration data'}, status=status.HTTP_400_BAD_REQUEST)


class Baracade1View(generics.ListAPIView):
    queryset = Baracade1.objects.using('pre_existing').all()
    serializer_class = Baracade1Serializer


class IndexDBView(generics.ListAPIView):
    queryset = Indexdb1.objects.using('pre_existing').all()
    serializer_class = IndexDBSerializer