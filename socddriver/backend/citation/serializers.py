from rest_framework import serializers
from .models import Citation, Violation

# ------------------------------
# 🔹 Violation Serializer
# ------------------------------
class ViolationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Violation
        fields = ['id', 'or_sec_no', 'descriptions']

# ------------------------------
# 🔹 Citation Serializer
# ------------------------------
class CitationSerializer(serializers.ModelSerializer):
    violations = ViolationSerializer(many=True, read_only=True)  # For GET requests
    violation_ids = serializers.PrimaryKeyRelatedField(
        queryset=Violation.objects.all(), many=True, write_only=True
    )  # For POST requests (accepts IDs)

    class Meta:
        model = Citation
        fields = ["citation_no", "full_name","birthday", "age", "gender", "full_address", "driv_lic", "exp_date", "reg_owner", "reg_address", "veh_type", "plate_no", "crt_reg_no", "franc_no", "place_of_viola", "date_of_viola", "time_of_viola", "amounts", "remarks", "app_officer",  "violations", 'violation_ids']



    def create(self, validated_data):
        violation_ids = validated_data.pop('violation_ids', [])
        citation = Citation.objects.create(**validated_data)
        citation.violations.set(violation_ids)  # Assign many-to-many violations
        return citation

    def update(self, instance, validated_data):
        violations_data = validated_data.pop("violations", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if violations_data is not None:
            instance.violations.set(violations_data)  # Update violations
        return instance
