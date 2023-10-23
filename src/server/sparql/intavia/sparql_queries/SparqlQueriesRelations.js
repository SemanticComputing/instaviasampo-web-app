const perspectiveID = 'relations'

export const relationProperties = `
    {
      ?id rdfs:label  ?prefLabel__id .
      BIND(?prefLabel__id AS ?prefLabel__prefLabel)
      #BIND(?id as ?uri__id)
      ##BIND(?id as ?uri__dataProviderUrl)
      #BIND(?id as ?uri__prefLabel)
    }
    UNION
    {
      ?id itv:relationSubject ?relationSubject__id .
      ?relationSubject__id rdfs:label ?relationSubject__prefLabel .
    }
    UNION
    {
      ?id itv:relationObject ?relationObject__id .
      ?relationObject__id rdfs:label ?relationObject__prefLabel .
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
