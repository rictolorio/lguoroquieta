from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Citation, Violation
from .serializers import CitationSerializer, ViolationSerializer

class CitationViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing Citations (Create, Read, Update, Delete)
    """
    queryset = Citation.objects.all()
    serializer_class = CitationSerializer

    def create(self, request, *args, **kwargs):
        """
        Create a new Citation, associating existing violations by ID.
        """
        citation_data = request.data
        violations_data = citation_data.get("violations", [])

        # Ensure violations are provided as IDs, not full objects
        violations = Violation.objects.filter(id__in=violations_data)

        # Check if all violation IDs are valid
        if len(violations) != len(violations_data):
            return Response({"error": "One or more violation IDs are invalid."}, status=status.HTTP_400_BAD_REQUEST)

        # Now create the citation
        citation_serializer = self.get_serializer(data=citation_data)
        if citation_serializer.is_valid():
            citation = citation_serializer.save()

            # Add violations to the citation (many-to-many relation)
            citation.violations.set(violations)  # This will associate the violations with the citation

            return Response(citation_serializer.data, status=status.HTTP_201_CREATED)

        return Response(citation_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # The other methods (update, destroy) remain unchanged



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
