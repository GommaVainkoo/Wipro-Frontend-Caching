# Generated by Django 4.2.3 on 2023-08-20 05:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Baracade1",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("Version", models.TextField()),
                ("Released", models.DateField()),
                ("EOS", models.DateField()),
                ("Latest", models.TextField()),
            ],
            options={
                "db_table": "Baracade1",
                "managed": False,
            },
        ),
    ]