package event.evenement1;

import event.evenement1.bd.DatabaseConnection;
import event.evenement1.model.Users;

import java.sql.*;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

@Path("users")
public class UserResource {

    // Méthode pour s'inscrire (register)
    @POST
    @Path("register")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response register(Users user) {
        try (Connection connection = DatabaseConnection.getConnection()) {
            // Vérifier si l'email existe déjà
            System.out.println(user.toString());

            String checkEmailQuery = "SELECT COUNT(*) FROM users WHERE email = ?";
            try (PreparedStatement ps = connection.prepareStatement(checkEmailQuery)) {
                ps.setString(1, user.getEmail());

                try (ResultSet rs = ps.executeQuery()) {
                    if (rs.next() && rs.getInt(1) > 0) {
                        return Response.status(Response.Status.CONFLICT)
                                .entity("User with this email already exists.")
                                .build();
                    }
                }
            }

            // Insérer le nouvel utilisateur
            String insertQuery = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
            try (PreparedStatement ps = connection.prepareStatement(insertQuery)) {

                ps.setString(1, user.getName());
                ps.setString(2, user.getEmail());
                ps.setString(3, user.getPassword()); // Vous pouvez ajouter un hachage pour plus de sécurité

                int rowsAffected = ps.executeUpdate();
                if (rowsAffected > 0) {
                    return Response.status(Response.Status.CREATED)
                            .entity("User registered successfully.")
                            .build();
                } else {
                    return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                            .entity("Failed to register user.")
                            .build();
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Database error occurred.")
                    .build();
        }
    }

    // Méthode pour se connecter (login)
    @POST
    @Path("login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(Users user) {
        try (Connection connection = DatabaseConnection.getConnection()) {
            // Vérifier si l'utilisateur existe et que le mot de passe correspond
            String loginQuery = "SELECT * FROM users WHERE email = ? AND password = ?";
            try (PreparedStatement ps = connection.prepareStatement(loginQuery)) {
                ps.setString(1, user.getEmail());
                ps.setString(2, user.getPassword()); // Ajoutez un contrôle de hachage ici si nécessaire

                try (ResultSet rs = ps.executeQuery()) {
                    if (rs.next()) {
                        // Utilisateur trouvé et authentifié
                        Users authenticatedUser = new Users(
                                rs.getLong("id"),
                                rs.getString("name"),
                                rs.getString("email"),
                                rs.getString("password")
                        );
                        return Response.status(Response.Status.OK)
                                .entity(authenticatedUser)
                                .build();
                    } else {
                        return Response.status(Response.Status.UNAUTHORIZED)
                                .entity("Invalid email or password.")
                                .build();
                    }
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Database error occurred.")
                    .build();
        }
    }
}
