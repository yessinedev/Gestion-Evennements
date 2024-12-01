package event.evenement1;

import event.evenement1.bd.DatabaseConnection;
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
}
