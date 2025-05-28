package casa.eric.erzieherapp.backend.repository;

import casa.eric.erzieherapp.backend.model.Gruppe;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GruppeRepository extends MongoRepository<Gruppe, String> {
}
