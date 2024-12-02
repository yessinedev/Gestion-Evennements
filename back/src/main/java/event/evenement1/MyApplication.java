package event.evenement1;
import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/api") // Define the base URI for your RESTful services.
public class MyApplication extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> classes = new HashSet<>();
        classes.add(CORSFilter.class);
        classes.add(CategoryResource.class);
        classes.add(UserResource.class);
        classes.add(EventResource.class);
        classes.add(EventParticipantResource.class);
        return classes;
    }
}
