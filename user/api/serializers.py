from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from user.models import Hobbies
from user.models import Baracade1
from user.models import Indexdb1
from django.contrib.auth.models import User


class HobbieSerializer(ModelSerializer):
    class Meta():
        model=Hobbies 
        fields='__all__'
    



class Baracade1Serializer(serializers.ModelSerializer):
    class Meta:
        model = Baracade1
        fields = '__all__'

class IndexDBSerializer(serializers.ModelSerializer):
    class Meta:
        model = Indexdb1
        fields = '__all__'