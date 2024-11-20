package event.evenement1;

import event.evenement1.bd.DatabaseConnection;
import event.evenement1.model.Event;
import event.evenement1.model.Category;
import event.evenement1.model.Users;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Path("/events")
public class EventResource {

   
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createEvent(Event event) {
        String query = "INSERT INTO events ( name, description, date, location, type, joinCode, limitParticipants, category_id, organizer_id) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement ps = connection.prepareStatement(query)) {

           
            ps.setString(1, event.getName());
            ps.setString(2, event.getDescription());
            ps.setTimestamp(3, Timestamp.valueOf(event.getDate()));
            ps.setString(4, event.getLocation());
            ps.setString(5, event.getType());
            ps.setString(6, event.getJoinCode());
            ps.setInt(7, event.getLimitParticipants());
            ps.setLong(8, event.getCategory().getId());
            ps.setLong(9, event.getOrganizer().getId());

            ps.executeUpdate();
            return Response.status(Response.Status.CREATED)
                           .entity("Event created successfully!")
                           .build();
        } catch (SQLException e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                           .entity("Error creating event: " + e.getMessage())
                           .build();
        }
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllEvents() {
        String query = "SELECT * FROM events";
        List<Event> events = new ArrayList<>();

        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement ps = connection.prepareStatement(query);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                events.add(mapResultSetToEvent(rs));
            }
            return Response.ok(events).build();
        } catch (SQLException e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                           .entity("Error retrieving events: " + e.getMessage())
                           .build();
        }
    }


    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEventById(@PathParam("id") String id) {
        String query = "SELECT * FROM events WHERE id = ?";

        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement ps = connection.prepareStatement(query)) {

            ps.setString(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Response.ok(mapResultSetToEvent(rs)).build();
                } else {
                    return Response.status(Response.Status.NOT_FOUND)
                                   .entity("Event not found with ID: " + id)
                                   .build();
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                           .entity("Error retrieving event: " + e.getMessage())
                           .build();
        }
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateEvent(@PathParam("id") String id, Event event) {
        String query = "UPDATE events SET name = ?, description = ?, date = ?, location = ?, type = ?, joinCode = ?, limitParticipants = ?, category_id = ?, organizer_id = ? WHERE id = ?";

        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement ps = connection.prepareStatement(query)) {

            ps.setString(1, event.getName());
            ps.setString(2, event.getDescription());
            ps.setTimestamp(3, Timestamp.valueOf(event.getDate()));
            ps.setString(4, event.getLocation());
            ps.setString(5, event.getType());
            ps.setString(6, event.getJoinCode());
            ps.setInt(7, event.getLimitParticipants());
            ps.setLong(8, event.getCategory().getId());
            ps.setLong(9, event.getOrganizer().getId());
            ps.setString(10, id);

            int rowsAffected = ps.executeUpdate();
            if (rowsAffected > 0) {
                return Response.ok("Event updated successfully!").build();
            } else {
                return Response.status(Response.Status.NOT_FOUND)
                               .entity("Event not found with ID: " + id)
                               .build();
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                           .entity("Error updating event: " + e.getMessage())
                           .build();
        }
    }

  
    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteEvent(@PathParam("id") String id) {
        String query = "DELETE FROM events WHERE id = ?";

        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement ps = connection.prepareStatement(query)) {

            ps.setString(1, id);
            int rowsAffected = ps.executeUpdate();
            if (rowsAffected > 0) {
                return Response.ok("Event deleted successfully!").build();
            } else {
                return Response.status(Response.Status.NOT_FOUND)
                               .entity("Event not found with ID: " + id)
                               .build();
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                           .entity("Error deleting event: " + e.getMessage())
                           .build();
        }
    }

    
    private Event mapResultSetToEvent(ResultSet rs) throws SQLException {
        return new Event(
            rs.getLong("id"),
            rs.getString("name"),
            rs.getString("description"),
            rs.getTimestamp("date").toLocalDateTime(),
            rs.getString("location"),
            rs.getString("type"),
            rs.getString("joinCode"),
            rs.getInt("limitParticipants"),
            new Category(rs.getLong("category_id"), null), 
            new Users(rs.getLong("organizer_id"), null, null, null) 
        );
    }
}
