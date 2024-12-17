package event.evenement1;

import event.evenement1.bd.DatabaseConnection;
import event.evenement1.dto.EventParticipantDTO;
import event.evenement1.model.EventParticipant;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Path("/participants")
public class EventParticipantResource {

    @POST
    @Path("/join")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response joinEvent(EventParticipant participant) {
        if (participant == null || participant.getEvent() == null || participant.getEvent().getId() == null ||
                participant.getUser() == null || participant.getUser().getId() == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Invalid participant data. Please provide event and user details.")
                    .build();
        }

        String query = "INSERT INTO event_participants (event_id, user_id) VALUES (?, ?)";

        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement ps = connection.prepareStatement(query)) {

            ps.setLong(1, participant.getEvent().getId());
            ps.setLong(2, participant.getUser().getId());

            int rowsInserted = ps.executeUpdate();

            if (rowsInserted > 0) {
                return Response.status(Response.Status.CREATED)
                        .entity("User successfully joined the event!")
                        .build();
            } else {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("Failed to join the event. Please try again.")
                        .build();
            }

        } catch (SQLException e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Database error: " + e.getMessage())
                    .build();
        }
    }

    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeParticipant(EventParticipantDTO participant) {
        if (participant == null || participant.getEventId() == null || participant.getUser() == null) {
            System.out.println(participant);
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Invalid participant data. Ensure event and user information are provided.")
                    .build();
        }

        String query = "DELETE FROM event_participants WHERE event_id = ? AND user_id = ?";

        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement ps = connection.prepareStatement(query)) {

            ps.setLong(1, participant.getEventId());
            ps.setLong(2, participant.getUser().getId());

            int rowsDeleted = ps.executeUpdate();

            if (rowsDeleted > 0) {
                return Response.status(Response.Status.NO_CONTENT)
                        .entity("Participant successfully removed from the event.")
                        .build();
            } else {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("No matching participant found for the given event and user.")
                        .build();
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("An internal error occurred while processing the request.")
                    .build();
        }
    }

}
