const perspectiveID = 'bs_relations'

export const placeRelationProperties = `
    {
      ?id skos:prefLabel ?prefLabel__id .
      BIND(?prefLabel__id AS ?prefLabel__prefLabel)
      BIND(?id as ?uri__id)
      BIND(?id as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
    }
    UNION
    {
      ?id relse:personSubject/^owl:sameAs ?person__id .
      ?person__id skos:prefLabel ?person__prefLabel .
    }
    UNION
    {
      ?id relse:placeObject ?place__id .
      ?place__id skos:prefLabel ?place__prefLabel .
    }
    UNION
    {
      ?id relse:relationType ?relationType__id .
      ?relationType__id skos:prefLabel ?relationType__prefLabel .
    }
    UNION
    {
      ?id relse:sourceLink ?source__id .
      ?id relse:sourceName ?source__prefLabel .
      BIND (?source__id AS ?source__dataProviderUrl)
    }
`

export const placesQuery = `
  SELECT DISTINCT ?id ?lat ?long
  (1 as ?instanceCount) # for heatmap
  WHERE {
    <FILTER>
    ?id relse:placeObject/relse:nbf/geo:lat ?lat ;
    relse:placeObject/relse:nbf/geo:long ?long .
  }
`

export const knowledgeGraphMetadataQuery = `
  SELECT * 
  WHERE {
    ?id a sd:Dataset ;
        dct:title ?title ;
        dct:publisher ?publisher ;
        dct:rightsHolder ?rightsHolder ;
        dct:modified ?modified ;
        dct:source ?databaseDump__id .
    ?databaseDump__id skos:prefLabel ?databaseDump__prefLabel ;
                      mmm-schema:data_provider_url ?databaseDump__dataProviderUrl ;
                      dct:modified ?databaseDump__modified .
  }
`
