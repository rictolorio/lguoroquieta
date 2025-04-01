from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Citation, Violation
from .serializers import CitationSerializer, ViolationSerializer

class CitationViewSet(viewsets.ModelViewSet):
    queryset = Citation.objects.prefetch_related('violations')
    serializer_class = CitationSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        violations = data.pop("violations", [])  # Extract violation IDs
        serializer = self.get_serializer(data=data)

        if serializer.is_valid():
            citation = serializer.save()
            citation.violations.set(violations)  # Assign many-to-many violations
            return Response(CitationSerializer(citation).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class ViolationViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing Violations (Create, Read, Update, Delete)
    """
    queryset = Violation.objects.all()
    serializer_class = ViolationSerializer

    def create(self, request, *args, **kwargs):
        """
        Create a new Violation record
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            violation = serializer.save()
            return Response(ViolationSerializer(violation).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        """
        Update an existing Violation record
        """
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            violation = serializer.save()
            return Response(ViolationSerializer(violation).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        """
        Delete a Violation record
        """
        instance = self.get_object()
        instance.delete()
        return Response({"message": "Violation deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
