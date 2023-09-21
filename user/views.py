from django.shortcuts import render, redirect, HttpResponse
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
import json


class MyClass:

    def __init__(self):

        self.user_id


    def HomePage(request):

        data1 = request.session.get('USER_DATA')
        data2 = request.session.get('USER_PASS')
        DATA = {'dict1': json.dumps({'user_name': data1, 'password': data2})}
        return render(request, 'home.html', DATA)


    def SignupPage(request):

        if request.method == 'POST':
            uname = request.POST.get('username')
            mail = request.POST.get('email')
            pw1 = request.POST.get('password1')
            pw2 = request.POST.get('password2')
            if pw1 != pw2:
                messages.success(request, ("Password not matching"))
                return redirect("signup")
            else:
                my_user = User.objects.create_user(uname, mail, pw1)
                my_user.save()
                return redirect("login")
        else:
            return render(request, 'signup.html')


    def SigninPage(request):

        if request.method == "POST":
            USER_NAME = request.POST.get('username')
            PASSWORD = request.POST.get('pass')
            user = authenticate(request, username=USER_NAME, password=PASSWORD)

            if user is not None:
                user = User.objects.get(username=USER_NAME)
                EMAIL = user.email
                request.session['USER_DATA'] = USER_NAME
                request.session['USER_PASS'] = EMAIL
                return redirect('index')
            else:
                messages.success(request, ("Invalid Username or Password"))
                return redirect('login')
        else:
            return render(request, 'login1.html')
    

    def logout_user(request):

        logout(request)
        messages.success(request, ("You were logged out."))
        return redirect('login')
        