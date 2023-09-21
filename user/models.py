from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Hobbies(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    body=models.TextField()



class Baracade1(models.Model):
    id=models.IntegerField(primary_key=True)
    version = models.TextField(db_column='Version', blank=True, null=True)  # Field name made lowercase.
    released = models.TextField(db_column='Released', blank=True, null=True)  # Field name made lowercase.
    eos = models.DateField(db_column='EOS', blank=True, null=True)  # Field name made lowercase.
    latest = models.TextField(db_column='Latest', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Baracade1'


class Indexdb1(models.Model):
    id = models.IntegerField(primary_key=True)
    period = models.FloatField(db_column='Period', blank=True, null=True)  # Field name made lowercase.
    inst_sector = models.TextField(db_column='Inst_sector', blank=True, null=True)  # Field name made lowercase.
    inst_sector_code = models.IntegerField(db_column='Inst_sector_code', blank=True, null=True)  # Field name made lowercase.
    descriptor = models.TextField(db_column='Descriptor', blank=True, null=True)  # Field name made lowercase.
    sna08trans = models.TextField(db_column='SNA08TRANS', blank=True, null=True)  # Field name made lowercase.
    asset_liability_code = models.TextField(db_column='Asset_liability_code', blank=True, null=True)  # Field name made lowercase.


    class Meta:
        managed = False
        db_table = 'indexdb10'

    