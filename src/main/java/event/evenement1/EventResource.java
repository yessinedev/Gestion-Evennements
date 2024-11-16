package event.evenement1;

import java.sql.Connection;

import event.evenement1.bd.DatabaseConnection;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;


@Path("myresource")
public class EventResource {
    Connection connection = DatabaseConnection.getConnection();
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getIt() {

        try (Connection connection = DatabaseConnection.getConnection()) {
            if (connection != null) {
                return"<h1>Database connection successful!</h1>";
            } else {
                return "<h1>Failed to make connection!</h1>";
            }
        } catch (Exception e) {

            return "<h1>Error during database connection: " + e.getMessage() + "</h1>";
        }
    }

}
