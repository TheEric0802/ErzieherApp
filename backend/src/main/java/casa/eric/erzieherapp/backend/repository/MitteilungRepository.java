package casa.eric.erzieherapp.backend.repository;

import casa.eric.erzieherapp.backend.model.Mitteilung;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MitteilungRepository extends MongoRepository<Mitteilung, String> {
}
