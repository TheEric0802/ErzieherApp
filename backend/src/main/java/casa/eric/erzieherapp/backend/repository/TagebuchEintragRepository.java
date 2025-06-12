package casa.eric.erzieherapp.backend.repository;

import casa.eric.erzieherapp.backend.model.TagebuchEintrag;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface TagebuchEintragRepository extends MongoRepository<TagebuchEintrag, String> {
    Optional<TagebuchEintrag> findByGruppeIdAndDatum(String gruppeId, LocalDate datum);

    List<TagebuchEintrag> findByGruppeId(String gruppeId);
}
